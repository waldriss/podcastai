"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import GenerateThumbnail from "@/components/create-quote/GenerateThumbnail";
import { Voice } from "@/lib/types/quote";
import GenerateQuote from "@/components/create-quote/GenerateQuote";
import { useToast } from "@/hooks/use-toast";
import { useCreateQuote } from "@/lib/api/react-query/mutations";
import { useAuth } from "@clerk/nextjs";
const formSchema = z.object({
  quoteTitle: z.string().min(2),
  quoteDescription: z.string().min(2),
});
const voiceCategories = ["brian", "bill", "george", "lilly"];

const CreateQuote = () => {
  const [voiceType, setVoiceType] = useState<Voice>("brian");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [voicePrompt, setVoicePrompt] = useState("");
  const { getToken } = useAuth();
  const { mutateAsync: createQuote } = useCreateQuote(getToken);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quoteTitle: "",
      quoteDescription: "",
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async ({
    quoteDescription,
    quoteTitle,
  }: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      if (
        !audioUrl ||
        !imageUrl ||
        !voiceType ||
        audioDuration == 0 ||
        imagePrompt == "" ||
        voicePrompt == ""
      ) {
        toast({
          title: "Please generate audio and image",
        });
        setIsSubmitting(false);
        throw new Error("Please generate audio and image");
      }
      const res=await createQuote({
        audioDuration,
        quoteTitle,
        quoteDescription,
        imagePrompt,
        imageUrl,
        audioUrl,
        voicePrompt,
        views: 0,
        voiceType,
      });

      //createquote
      toast({ title: "Quote created" });
      setIsSubmitting(false);
      //router.push('/')
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Quote</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="quoteTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="JSM Pro quote"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2.5">
              <Label className="text-16 font-bold text-white-1">
                Select AI Voice
              </Label>

              <Select onValueChange={(value: Voice) => setVoiceType(value)}>
                <SelectTrigger
                  className={cn(
                    "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1"
                  )}
                >
                  <SelectValue
                    placeholder="Select AI Voice"
                    className="placeholder:text-gray-1 "
                  />
                </SelectTrigger>
                <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                  {voiceCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize focus:bg-orange-1"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>

                {/*voiceType && (
                  <audio
                    src={`/${voiceType}.mp3`}
                    autoPlay
                    className="hidden"
                  />
                )*/}
              </Select>
            </div>

            <FormField
              control={form.control}
              name="quoteDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Write a short quote description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col pt-10">
            <GenerateQuote
              setAudio={setAudioUrl}
              voiceType={voiceType!}
              audio={audioUrl}
              voicePrompt={voicePrompt}
              setVoicePrompt={setVoicePrompt}
              setAudioDuration={setAudioDuration}
            />

            <GenerateThumbnail
              setImage={setImageUrl}
              image={imageUrl}
              imagePrompt={imagePrompt}
              setImagePrompt={setImagePrompt}
            />
            <div className="mt-10 w-full">
              <Button
                type="submit"
                className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
              >
                {isSubmitting ? (
                  <>
                    Submitting
                    <Loader size={20} className="animate-spin ml-2" />
                  </>
                ) : (
                  "Submit & Publish Quote"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateQuote;
