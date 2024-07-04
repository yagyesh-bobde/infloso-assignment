import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

// Define the schema for form validation
const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 8 characters long" }),
});

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate()

  const { toast } = useToast();

  const onSubmit = (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log(data);
    toast({
      title: "Sign Up Successful",
      description: "Created your account successfully. Please sign in to continue.",
    })
    navigate("/sign-in")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 hidden md:block">
            <img
              src="/bg.jpg"
              alt="Sign Up"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6">
              Sign Up for Connectverse
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    /* Navigate to login */
                  }}
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
