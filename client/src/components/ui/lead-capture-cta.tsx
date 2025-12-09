import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Sparkles, Phone, Mail, ArrowRight, Stars } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type LeadFormState = {
  name: string;
  email: string;
  project: string;
  goal: string;
};

const RECIPIENT = "genekellyboyle@gmail.com";

function buildMailto({ name, email, project, goal }: LeadFormState) {
  const subject = encodeURIComponent(`New project inquiry from ${name || "a viewer"}`);
  const body = encodeURIComponent(
    [
      `Hi Gene,`,
      "",
      `I'd like to start an animation project with you.`,
      "",
      `Project outline: ${project || "(add details here)"}`,
      `Goal / audience: ${goal || "(add goals here)"}`,
      "",
      `You can reach me at: ${email || "(add your email)"}`,
    ].join("\n"),
  );

  return `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
}

export default function LeadCaptureCta() {
  const { toast } = useToast();
  const [form, setForm] = useState<LeadFormState>({
    name: "",
    email: "",
    project: "",
    goal: "",
  });

  const isPrimaryFieldsFilled = useMemo(
    () => form.email.trim().length > 5 && form.name.trim().length > 1,
    [form.email, form.name],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mailto = buildMailto(form);
    window.location.href = mailto;

    toast({
      title: "Opening your email client",
      description: "Pre-filled brief ready to send to Gene.",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-4 right-4 z-50 shadow-lg shadow-primary/30 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Stars className="mr-2 h-4 w-4" />
          Start a project
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <Badge variant="secondary">Conversion boost</Badge>
          </div>
          <SheetTitle className="text-xl">
            Ready for a standout animation? Send a 60-second project brief.
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Faster path to a reply: add a short goal and how soon you need it. You can also book a call or DM if you
            prefer.
          </p>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Showreel intro</Badge>
            <Badge variant="outline">YouTube opener</Badge>
            <Badge variant="secondary">Storyboard to final render</Badge>
            <Badge variant="outline">Brand animation</Badge>
          </div>

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={form.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project idea</Label>
              <Textarea
                id="project"
                placeholder="Short YouTube intro, brand bumper, full episode..."
                value={form.project}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setForm((prev) => ({ ...prev, project: event.target.value }))
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal">Goal & audience</Label>
              <Textarea
                id="goal"
                placeholder="Grow subscribers, pitch a product, brand storytelling..."
                value={form.goal}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setForm((prev) => ({ ...prev, goal: event.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" disabled={!isPrimaryFieldsFilled} className="w-full">
                Send brief
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Button asChild variant="outline" className="w-full">
                  <a href={`mailto:${RECIPIENT}?subject=${encodeURIComponent("Quick intro call")}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Book call
                  </a>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <a href="https://www.youtube.com/@genekellyboyle" target="_blank" rel="noreferrer noopener">
                    <Mail className="mr-2 h-4 w-4" />
                    View channel
                  </a>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

