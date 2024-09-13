import { GeneratePodcastProps } from "@/lib/types";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useGenerateAudio } from "@/lib/api/react-query/mutations";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";

const GeneratePodcast = ({voicePrompt,audio,setAudio,setAudioDuration,setVoicePrompt,voiceType}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { getToken } = useAuth();
  const {mutateAsync:generateAudio}=useGenerateAudio(getToken)
  const { toast } = useToast()

  const generatePodcast=async(e:any)=>{
    e.preventDefault();
    if(!voicePrompt) {
      toast({
        title: "Please provide a voiceType to generate a podcast",
      })
      return setIsGenerating(false);
    }
    try {
    const arrayBuffer= await generateAudio({input:voicePrompt,voice:voiceType})
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(blob);
    console.log(arrayBuffer);
    setAudio(audioUrl);

    } catch (error) {
      toast({
        title: "Error creating a podcast",
        variant: 'destructive',
      })
      setIsGenerating(false);
    }
   
  }

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
        
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {audio && (
        <audio
          controls
          src={audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
