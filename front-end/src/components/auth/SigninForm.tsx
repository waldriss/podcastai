"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().min(1, {
    message: "please enter email.",
  }),
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
});

const SigninForm = () => {
  const router = useRouter();

  const { signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const signedin = await signIn?.create({
        identifier: values.email,
        password: values.password,
      });
      if (signedin) {
        if (setActive) {
          await setActive({ session: signedin.createdSessionId });
        
          router.push("/");
        }
      }
    } catch (error) {
      setIsLoading(false);
      
    }
  };

  const handeSubmitGoogle=async()=>{
    const signedIn=await signIn?.authenticateWithRedirect({redirectUrl:"/ssocallback",strategy:"oauth_google",redirectUrlComplete:"/googleAuthLoader"})
  }
  return (
    <section className="bg-black-1 w-[500px] py-8 rounded-md px-10 flex flex-col items-center justify-start ">
      <Image src={"/icons/auth-logo.svg"} alt="logo" height={180} width={180} />
      <h2 className="text-white-1 text-lg font-bold pt-4">
        {" "}
        Sign in to your account
      </h2>
      <p className="text-sm text-white-1">
        Please fill in the details to sign in to your account.
      </p>
      <Button className="w-full border-[0.5px] flex justify-center items-center border-solid border-[#121316] my-6 rounded-md p-1">
        <Image src={"/icons/google.webp"} alt="" width={30} height={30} />
      </Button>
      <div className="relative w-full">
        <div className="relative flex justify-center items-center text-xs uppercase">
          <Separator className="flex-grow !w-auto bg-orange-1 " />
          <span className=" whitespace-nowrap px-4 text-white-1">Or</span>
          <Separator className="flex-grow !w-auto bg-orange-1 " />
        </div>
      </div>
      <div className="w-full mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
            
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input
                        className="bg-transparent focus-visible:ring-1 ring-black-3 !ring-offset-black-3 text-white-1 placeholder:text-white-3 border-[#0e0f12] focus:border-black-3"
                        placeholder="Email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-orange-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-3 mb-6">
                    <FormControl>
                      <Input
                        className="bg-transparent focus-visible:ring-1 ring-black-3 !ring-offset-black-3 text-white-1 placeholder:text-white-3 border-[#0e0f12] focus:border-black-3"
                        placeholder="Password"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-orange-1" />
                  </FormItem>
                )}
              />
            </div>
            <Button className="text-white-1 bg-orange-1" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <p className="px-8  pt-6 text-center text-sm text-white-1">
      Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-4  text-orange-1"
            
          >
             Sign Up
          </Link>{" "}
         
        </p>
      </div>
     
    </section>
  );
};

export default SigninForm;
