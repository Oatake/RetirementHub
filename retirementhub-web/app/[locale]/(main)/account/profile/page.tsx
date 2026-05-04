"use client"
import { useState } from "react"
import Image from "next/image"
import { Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/auth-store"

const THAI_CITIES = ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hua Hin", "Koh Samui", "Not sure yet"]
const TIMELINES = ["Within 1 year", "1–2 years", "2–5 years", "5+ years", "Not sure yet"]
const HEALTH_CONDITIONS = ["Hypertension", "Diabetes", "Heart disease", "Arthritis", "Respiratory issues", "Mental health condition", "None"]
const ACTIVITIES = ["Golf", "Yoga", "Nature walks", "Swimming", "Cycling", "Cultural activities", "Social clubs", "Cooking classes"]

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuthStore()
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [name, setName] = useState(user?.name ?? "")
  const [age, setAge] = useState(String(profile?.age ?? ""))
  const [targetCity, setTargetCity] = useState(profile?.targetCity ?? "")
  const [timeline, setTimeline] = useState(profile?.targetTimeline ?? "")
  const [savings, setSavings] = useState(String(profile?.financialData?.savings ?? ""))
  const [income, setIncome] = useState(String(profile?.financialData?.monthlyIncome ?? ""))
  const [expenses, setExpenses] = useState(String(profile?.financialData?.monthlyExpenses ?? ""))
  const [conditions, setConditions] = useState<string[]>(profile?.healthData?.chronicConditions ?? [])
  const [activities, setActivities] = useState<string[]>(profile?.lifestylePrefs?.activities ?? [])

  const toggle = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item])
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 800))
    updateProfile({
      age: parseInt(age) || 55,
      targetCity,
      targetTimeline: timeline,
      financialData: {
        savings: parseInt(savings) || 0,
        monthlyIncome: parseInt(income) || 0,
        monthlyExpenses: parseInt(expenses) || 0,
        debt: 0,
      },
      healthData: {
        healthStatus: profile?.healthData?.healthStatus ?? 3,
        chronicConditions: conditions,
        healthGoals: profile?.healthData?.healthGoals ?? [],
      },
      lifestylePrefs: {
        activities,
        housingType: profile?.lifestylePrefs?.housingType ?? "Condo",
      },
    })
    setIsSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-on-surface mb-1">My Profile</h1>
        <p className="text-on-surface-dim text-sm">Update your personal details and preferences to improve your Retirement Score accuracy.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          {user?.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.name} width={72} height={72} className="rounded-full" />
          ) : (
            <div className="h-18 w-18 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary h-[72px] w-[72px]">
              {user?.name[0]}
            </div>
          )}
          <button className="absolute bottom-0 right-0 h-6 w-6 bg-primary rounded-full flex items-center justify-center border-2 border-white">
            <Camera className="h-3 w-3 text-white" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-on-surface">{user?.name}</p>
          <p className="text-sm text-on-surface-dim">{user?.email}</p>
          <Badge variant="outline" className="mt-1 text-xs capitalize">{user?.userType}</Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <h2 className="font-semibold text-on-surface mb-4">Basic Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Age</Label>
              <Input type="number" value={age} onChange={e => setAge(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Retirement goals */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <h2 className="font-semibold text-on-surface mb-4">Retirement Goals</h2>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Target City</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {THAI_CITIES.map(city => (
                  <button
                    key={city}
                    onClick={() => setTargetCity(city)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${targetCity === city ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface hover:border-primary/30"}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Target Timeline</Label>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${timeline === t ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface-dim hover:border-primary/30"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Financial */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <h2 className="font-semibold text-on-surface mb-4">Financial Profile</h2>
          <p className="text-xs text-on-surface-dim mb-4">🔒 AES-256 encrypted. Never shared with providers.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Total Savings (THB)", value: savings, set: setSavings, placeholder: "4500000" },
              { label: "Monthly Income (THB)", value: income, set: setIncome, placeholder: "120000" },
              { label: "Monthly Expenses (THB)", value: expenses, set: setExpenses, placeholder: "85000" },
            ].map(field => (
              <div key={field.label} className="space-y-1.5">
                <Label>{field.label}</Label>
                <Input type="number" value={field.value} onChange={e => field.set(e.target.value)} placeholder={field.placeholder} />
              </div>
            ))}
          </div>
        </div>

        {/* Health */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <h2 className="font-semibold text-on-surface mb-4">Health Profile</h2>
          <Label className="mb-2 block">Chronic Conditions</Label>
          <div className="flex flex-wrap gap-2">
            {HEALTH_CONDITIONS.map(c => (
              <button
                key={c}
                onClick={() => toggle(conditions, setConditions, c)}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${conditions.includes(c) ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface-dim hover:border-primary/30"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Lifestyle */}
        <div className="bg-surface-white border border-outline-light/60 rounded-xl p-5">
          <h2 className="font-semibold text-on-surface mb-4">Lifestyle Preferences</h2>
          <div className="flex flex-wrap gap-2">
            {ACTIVITIES.map(a => (
              <button
                key={a}
                onClick={() => toggle(activities, setActivities, a)}
                className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${activities.includes(a) ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface hover:border-primary/30"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} loading={isSaving} className="w-full" size="lg">
          {saved ? <><Check className="h-4 w-4 mr-2" /> Saved!</> : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
