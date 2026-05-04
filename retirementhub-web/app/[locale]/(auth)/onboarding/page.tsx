"use client"
import { useState } from "react"
import { useRouter } from "@/i18n/navigation"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth-store"

const STEPS = ["Basic Info", "Your Goal", "Target Location", "Financial Profile", "Health Profile", "Lifestyle"]
const THAI_CITIES = ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Hua Hin", "Koh Samui", "Not sure yet"]
const PLANNING_GOALS = ["Retire and relocate", "Work remotely in Thailand", "Relocate with family", "Explore options", "Eldercare planning"]
const TIMELINES = ["Within 1 year", "1–2 years", "2–5 years", "5+ years", "Not sure yet"]
const HEALTH_CONDITIONS = ["Hypertension", "Diabetes", "Heart disease", "Arthritis", "Respiratory issues", "Mental health condition", "None"]
const ACTIVITIES = ["Golf", "Yoga", "Nature walks", "Swimming", "Cycling", "Cultural activities", "Social clubs", "Cooking classes"]

export default function OnboardingPage() {
  const router = useRouter()
  const { updateProfile } = useAuthStore()
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState({
    nationality: "",
    age: "",
    goal: "",
    targetCity: "",
    timeline: "",
    savings: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    healthStatus: 3,
    conditions: [] as string[],
    activities: [] as string[],
  })

  const toggleItem = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else handleFinish()
  }

  const handleFinish = async () => {
    setIsSubmitting(true)
    updateProfile({
      age: parseInt(data.age) || 55,
      targetCity: data.targetCity || "Chiang Mai",
      planningGoal: data.goal,
      targetTimeline: data.timeline,
      financialData: {
        savings: parseInt(data.savings) || 0,
        monthlyIncome: parseInt(data.monthlyIncome) || 0,
        monthlyExpenses: parseInt(data.monthlyExpenses) || 0,
        debt: 0,
      },
      healthData: {
        healthStatus: data.healthStatus,
        chronicConditions: data.conditions,
        healthGoals: [],
      },
      lifestylePrefs: {
        activities: data.activities,
        housingType: "Condo",
      },
    })
    await new Promise(r => setTimeout(r, 800))
    router.push("/planning/dashboard")
  }

  return (
    <div className="w-full max-w-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-on-surface-dim mb-2">
          <span>Step {step + 1} of {STEPS.length}</span>
          <span>{Math.round(((step + 1) / STEPS.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1">
          {STEPS.map((s, i) => (
            <span key={s} className={`text-xs shrink-0 font-medium ${i === step ? "text-primary" : i < step ? "text-secondary" : "text-on-surface-dim"}`}>
              {i < step && "✓ "}{s}{i < STEPS.length - 1 ? " ·" : ""}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-surface-white border border-outline-light/60 rounded-2xl shadow-card p-8">
        {/* Step 0 */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface">Tell us about yourself</h2>
            <p className="text-sm text-on-surface-dim">This helps us personalise your experience.</p>
            <div className="space-y-1.5">
              <Label>Nationality</Label>
              <Input placeholder="e.g. British, American, Thai..." value={data.nationality} onChange={e => setData(d => ({ ...d, nationality: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Age</Label>
              <Input type="number" placeholder="e.g. 58" value={data.age} onChange={e => setData(d => ({ ...d, age: e.target.value }))} />
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface">What&apos;s your primary goal?</h2>
            <p className="text-sm text-on-surface-dim">Select the option that best describes your situation.</p>
            <div className="space-y-2">
              {PLANNING_GOALS.map(goal => (
                <button
                  key={goal}
                  onClick={() => setData(d => ({ ...d, goal }))}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                    data.goal === goal
                      ? "border-primary bg-primary/8 text-primary"
                      : "border-outline-light text-on-surface hover:border-primary/30 hover:bg-surface-low"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
            <div className="space-y-1.5 pt-2">
              <Label>Target timeline</Label>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map(t => (
                  <button
                    key={t}
                    onClick={() => setData(d => ({ ...d, timeline: t }))}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                      data.timeline === t ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface-dim hover:border-primary/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface">Where in Thailand?</h2>
            <p className="text-sm text-on-surface-dim">Choose your preferred city or select &quot;Not sure yet&quot; to explore.</p>
            <div className="grid grid-cols-2 gap-2">
              {THAI_CITIES.map(city => (
                <button
                  key={city}
                  onClick={() => setData(d => ({ ...d, targetCity: city }))}
                  className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
                    data.targetCity === city
                      ? "border-primary bg-primary/8 text-primary"
                      : "border-outline-light text-on-surface hover:border-primary/30 hover:bg-surface-low"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface">Financial profile</h2>
            <p className="text-sm text-on-surface-dim">Optional but improves your Retirement Score accuracy. All data is encrypted.</p>
            {[
              { label: "Total savings / assets (THB)", key: "savings", placeholder: "e.g. 4500000" },
              { label: "Monthly income / pension (THB)", key: "monthlyIncome", placeholder: "e.g. 120000" },
              { label: "Current monthly expenses (THB)", key: "monthlyExpenses", placeholder: "e.g. 85000" },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <Label>{label}</Label>
                <Input
                  type="number"
                  placeholder={placeholder}
                  value={data[key as keyof typeof data] as string}
                  onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
                />
              </div>
            ))}
            <p className="text-xs text-on-surface-dim">🔒 This information is AES-256 encrypted and never shared with providers.</p>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface">Health profile</h2>
            <p className="text-sm text-on-surface-dim">Helps us recommend relevant health services. Fully optional and encrypted.</p>
            <div className="space-y-1.5">
              <Label>Overall health status</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setData(d => ({ ...d, healthStatus: n }))}
                    className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-colors ${
                      data.healthStatus === n ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface-dim"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-on-surface-dim px-1">
                <span>Poor</span><span>Excellent</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Chronic conditions (if any)</Label>
              <div className="flex flex-wrap gap-2">
                {HEALTH_CONDITIONS.map(c => (
                  <button
                    key={c}
                    onClick={() => setData(d => ({ ...d, conditions: toggleItem(d.conditions, c) }))}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                      data.conditions.includes(c) ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface-dim hover:border-primary/30"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface">Lifestyle preferences</h2>
            <p className="text-sm text-on-surface-dim">Select the activities you enjoy — helps match you with the right city and services.</p>
            <div className="flex flex-wrap gap-2">
              {ACTIVITIES.map(a => (
                <button
                  key={a}
                  onClick={() => setData(d => ({ ...d, activities: toggleItem(d.activities, a) }))}
                  className={`px-3 py-2 rounded-xl border text-sm font-medium transition-colors ${
                    data.activities.includes(a) ? "border-primary bg-primary/8 text-primary" : "border-outline-light text-on-surface hover:border-primary/30 hover:bg-surface-low"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-secondary/8 border border-secondary/20">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                <p className="text-sm text-on-surface">
                  You&apos;re all set! Click <strong>Generate My Score</strong> to get your personalised Retirement Readiness Score.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-light/60">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} loading={isSubmitting} className="gap-1">
            {step === STEPS.length - 1 ? "Generate My Score" : "Continue"}
            {step < STEPS.length - 1 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-on-surface-dim mt-4">
        You can skip optional steps — they only affect score accuracy.
      </p>
    </div>
  )
}
