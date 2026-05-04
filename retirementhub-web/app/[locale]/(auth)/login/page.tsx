"use client"
import { useState } from "react"
import { Link } from "@/i18n/navigation"
import { useRouter } from "@/i18n/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/auth-store"

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login()
    router.push("/planning/dashboard")
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-surface-white border border-outline-light/60 rounded-2xl shadow-card p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-on-surface mb-1.5">Welcome back</h1>
          <p className="text-sm text-on-surface-dim">Sign in to your RetirementHub account</p>
        </div>

        <Button variant="outline" className="w-full gap-2 mb-4" type="button">
          <Globe className="h-4 w-4" />
          Continue with Google
        </Button>

        <div className="flex items-center gap-3 mb-4">
          <Separator className="flex-1" />
          <span className="text-xs text-on-surface-dim font-medium">or</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              {...register("email")}
            />
            {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              {...register("password")}
            />
            {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" loading={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-on-surface-dim mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">Create account</Link>
        </p>
      </div>
      <p className="text-center text-xs text-on-surface-dim mt-4">
        Demo: any email + password works
      </p>
    </div>
  )
}
