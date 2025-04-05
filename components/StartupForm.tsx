"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="max-w-3xl mx-auto space-y-8 px-6 py-10 rounded-2xl 
                 bg-gradient-to-b from-[#101010] to-[#0a0a0a] border border-white/10 
                 shadow-[0_0_20px_rgba(0,255,255,0.1)] text-white"
    >
      <div>
        <label htmlFor="title" className="block mb-2 font-semibold text-cyan-400">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="bg-[#1a1a1a] border border-cyan-700 text-white placeholder:text-gray-400"
          required
          placeholder="Awesome project name"
        />
        {errors.title && <p className="text-red-400 mt-2">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 font-semibold text-cyan-400">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="bg-[#1a1a1a] border border-cyan-700 text-white placeholder:text-gray-400"
          required
          placeholder="A short, clear explanation of your ideas"
        />
        {errors.description && <p className="text-red-400 mt-2">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block mb-2 font-semibold text-cyan-400">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="bg-[#1a1a1a] border border-cyan-700 text-white placeholder:text-gray-400"
          required
          placeholder="e.g. AI, DevTools, Web3"
        />
        {errors.category && <p className="text-red-400 mt-2">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="block mb-2 font-semibold text-cyan-400">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="bg-[#1a1a1a] border border-cyan-700 text-white placeholder:text-gray-400"
          required
          placeholder="https://your-image-url.com"
        />
        {errors.link && <p className="text-red-400 mt-2">{errors.link}</p>}
      </div>

      <div data-color-mode="dark">
        <label htmlFor="pitch" className="block mb-2 font-semibold text-cyan-400">
         Main content
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#1a1a1a",
            border: "1px solid #1e293b",
            color: "white",
          }}
          textareaProps={{
            placeholder: "Break down your idea, features, or the tech stack...",
            style: { backgroundColor: "#1a1a1a", color: "white" },
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="text-red-400 mt-2">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
                   py-4 rounded-full text-lg font-semibold hover:from-cyan-600 
                   hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your News"}
        <Send className="ml-2 size-5" />
      </Button>
    </form>
  );
};

export default StartupForm;
