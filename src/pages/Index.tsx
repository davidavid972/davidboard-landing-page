import { useState, useEffect, useCallback } from "react";
import { LegalDocumentsDialog, type LegalDocumentId } from "@/components/LegalDocumentsDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Bell, BookOpen, CalendarHeart, CalendarDays, Moon, CalendarClock,
  Settings, Monitor, LayoutTemplate, ShieldCheck, Wrench, 
  MessageCircle, Phone, Mail, CheckCircle2, Download, LayoutGrid, Accessibility,
  WifiOff, Package, AppWindow, Sparkles
} from "lucide-react";

import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import offline1 from "@/assets/offline-1.png";
import offline2 from "@/assets/offline-2.png";
import offline3 from "@/assets/offline-3.png";
import offlineSetting from "@/assets/offline-setting.png";

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
const offlineGalleryImages = [offline1, offline2, offline3, offlineSetting];

const WHATSAPP_PHONE = "972523517302";
const WHATSAPP_DEFAULT_MESSAGE =
  "שלום, הגעתי מהאתר של לוח דוד. אשמח לפרטים על מסך דיגיטלי לבית הכנסת.";
const whatsAppUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

type SlideshowGalleryProps = {
  images: readonly string[];
  ariaLabel: string;
  altPrefix?: string;
  imageFit?: "cover" | "contain";
};

const SlideshowGallery = ({
  images,
  ariaLabel,
  altPrefix = "תצוגת מסך לוח דוד – דוגמה",
  imageFit = "cover",
}: SlideshowGalleryProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="relative mx-auto w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden border bg-muted shadow-2xl flex items-center justify-center">
        <Monitor className="h-32 w-32 text-muted-foreground/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden border bg-muted shadow-2xl" role="region" aria-label={ariaLabel} aria-roledescription="slideshow">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${altPrefix} ${i + 1} מתוך ${images.length}`}
          className={`absolute inset-0 w-full h-full ${imageFit === "contain" ? "object-contain object-center" : "object-cover"} transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== current}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay" aria-hidden="true" />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 items-center justify-center" role="tablist" aria-label="בחירת תמונה">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`תמונה ${i + 1} מתוך ${images.length}`}
              onClick={() => setCurrent(i)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation rounded-full"
            >
              <span className={`block h-2.5 w-2.5 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const HeroGallery = () => (
  <SlideshowGallery images={galleryImages} ariaLabel="גלריית תמונות לוח דוד" />
);

const CookieBanner = ({ onOpenCookiePolicy }: { onOpenCookiePolicy: () => void }) => {
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookie-consent'));
  if (!visible) return null;
  const save = (value: 'accepted' | 'rejected') => {
    localStorage.setItem('cookie-consent', value);
    setVisible(false);
  };
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-background/20 bg-foreground/95 text-background p-4 pt-3 shadow-lg pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="הודעת שימוש בעוגיות"
      aria-live="polite"
    >
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-center sm:text-right max-w-3xl [overflow-wrap:anywhere]">
          אנו משתמשים בעוגיות ובאחסון מקומי (למשל <span lang="en">localStorage</span>) לצורך תפקוד חיוני של האתר, שמירת בחירתכם לגבי עוגיות והגדרות נגישות.
          לפרטים מלאים ראו את מדיניות העוגיות והפרטיות בעמוד.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
          <Button size="sm" variant="secondary" onClick={() => save('accepted')} aria-label="אישור שימוש בעוגיות והמשך גלישה">
            אישור והמשך
          </Button>
          <Button size="sm" variant="outline" className="border-background/40 text-background hover:bg-background/10" onClick={() => save('rejected')} aria-label="דחיית עוגיות שאינן הכרחיות לפעולת האתר">
            דחיית עוגיות לא חיוניות
          </Button>
          <Button size="sm" variant="ghost" className="text-background hover:text-background/80" onClick={onOpenCookiePolicy}>
            מדיניות עוגיות
          </Button>
        </div>
      </div>
    </div>
  );
};

const AccessibilityWidget = ({ onOpenAccessibilityStatement }: { onOpenAccessibilityStatement: () => void }) => {
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('a11y-hc') === 'true');
  const [largeText, setLargeText] = useState(() => localStorage.getItem('a11y-lg') === 'true');
  const [reduceMotion, setReduceMotion] = useState(() => localStorage.getItem('a11y-rm') === 'true');
  const [linkUnderline, setLinkUnderline] = useState(() => localStorage.getItem('a11y-ul') === 'true');

  const applyClass = (className: string, active: boolean) => {
    document.documentElement.classList.toggle(className, active);
  };

  const toggle = useCallback(
    (type: 'hc' | 'lg' | 'rm' | 'ul') => {
      if (type === 'hc') {
        const next = !highContrast;
        setHighContrast(next);
        applyClass('high-contrast', next);
        localStorage.setItem('a11y-hc', String(next));
      } else if (type === 'lg') {
        const next = !largeText;
        setLargeText(next);
        applyClass('large-text', next);
        localStorage.setItem('a11y-lg', String(next));
      } else if (type === 'rm') {
        const next = !reduceMotion;
        setReduceMotion(next);
        applyClass('reduce-motion', next);
        localStorage.setItem('a11y-rm', String(next));
      } else {
        const next = !linkUnderline;
        setLinkUnderline(next);
        applyClass('link-underline', next);
        localStorage.setItem('a11y-ul', String(next));
      }
    },
    [highContrast, largeText, reduceMotion, linkUnderline],
  );

  useEffect(() => {
    if (highContrast) document.documentElement.classList.add('high-contrast');
    if (largeText) document.documentElement.classList.add('large-text');
    if (reduceMotion) document.documentElement.classList.add('reduce-motion');
    if (linkUnderline) document.documentElement.classList.add('link-underline');
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const resetAll = useCallback(() => {
    setHighContrast(false);
    setLargeText(false);
    setReduceMotion(false);
    setLinkUnderline(false);
    ['high-contrast', 'large-text', 'reduce-motion', 'link-underline'].forEach((c) => document.documentElement.classList.remove(c));
    ['a11y-hc', 'a11y-lg', 'a11y-rm', 'a11y-ul'].forEach((k) => localStorage.removeItem(k));
  }, []);

  return (
    <div className="fixed z-50 flex flex-col items-start gap-2 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-[calc(1rem+env(safe-area-inset-left,0px))]">
      {open && (
        <div
          id="a11y-dialog"
          className="mb-0 w-[min(100vw-2rem,18rem)] bg-card border rounded-lg shadow-xl p-3 space-y-1 text-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-widget-title"
        >
          <p id="a11y-widget-title" className="font-semibold text-foreground px-2 pb-2 border-b mb-2">
            התאמות נגישות
          </p>
          <p className="text-xs text-muted-foreground px-2 pb-2">בחרו התאמות; ההעדפות נשמרות במכשיר זה.</p>
          <button type="button" onClick={() => toggle('hc')} className="block w-full text-right px-2 py-2 rounded-md hover:bg-muted transition-colors">
            {highContrast ? '✓ ' : ''}ניגודיות גבוהה
          </button>
          <button type="button" onClick={() => toggle('lg')} className="block w-full text-right px-2 py-2 rounded-md hover:bg-muted transition-colors">
            {largeText ? '✓ ' : ''}הגדלת טקסט
          </button>
          <button type="button" onClick={() => toggle('rm')} className="block w-full text-right px-2 py-2 rounded-md hover:bg-muted transition-colors">
            {reduceMotion ? '✓ ' : ''}הפחתת תנועה ואנימציה
          </button>
          <button type="button" onClick={() => toggle('ul')} className="block w-full text-right px-2 py-2 rounded-md hover:bg-muted transition-colors">
            {linkUnderline ? '✓ ' : ''}הדגשת קישורים (קו תחתון)
          </button>
          <button type="button" onClick={resetAll} className="block w-full text-right px-2 py-2 rounded-md border border-dashed border-muted-foreground/40 hover:bg-muted transition-colors text-muted-foreground">
            איפוס כל ההתאמות
          </button>
          <button
            type="button"
            onClick={onOpenAccessibilityStatement}
            className="block w-full text-right px-2 py-2 rounded-md text-primary hover:underline text-xs"
          >
            להצהרת נגישות מלאה
          </button>
        </div>
      )}
      <Button
        size="icon"
        variant="outline"
        className="rounded-full h-12 w-12 shadow-lg bg-card"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="פתיחה וסגירה של תפריט התאמות נגישות"
      >
        <Accessibility className="h-6 w-6" aria-hidden="true" />
      </Button>
    </div>
  );
};

const Index = () => {
  const [legalDoc, setLegalDoc] = useState<LegalDocumentId | null>(null);

  const openLegal = (id: LegalDocumentId) => setLegalDoc(id);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 sm:pb-6" dir="rtl">
      <LegalDocumentsDialog active={legalDoc} onOpenChange={(o) => !o && setLegalDoc(null)} />
      <a href="#main-content" className="skip-to-content">
        דלג לתוכן העיקרי
      </a>
      <CookieBanner onOpenCookiePolicy={() => openLegal("cookies")} />
      <AccessibilityWidget onOpenAccessibilityStatement={() => openLegal("accessibility")} />
      {/* Navbar / Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex min-h-14 h-auto sm:h-16 py-2 sm:py-0 items-center justify-between gap-3" aria-label="ניווט ראשי">
          <div className="flex items-center gap-2 text-primary font-bold text-xl sm:text-2xl min-w-0">
            <Monitor className="h-6 w-6 shrink-0" aria-hidden="true" />
            <span className="truncate">לוח דוד</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="hidden sm:inline-block text-muted-foreground font-medium">052-3517302</span>
            <Button className="touch-manipulation" onClick={() => window.open(whatsAppUrl, '_blank')} aria-label="פתיחת שיחה בוואטסאפ">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              וואטסאפ
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="main-content" tabIndex={-1}>
      <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-32 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        <div className="container relative z-10 max-w-6xl">
          <div className="space-y-6 sm:space-y-8 min-w-0">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium rounded-full bg-secondary/20 text-secondary-foreground hover:bg-secondary/30">
              מערכת תצוגה לבתי כנסת ובתי מדרש
            </Badge>
            <div className="space-y-4">
              <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight [overflow-wrap:anywhere]">
                לוח דוד — מסך דיגיטלי לבית הכנסת
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed [overflow-wrap:anywhere]">
                תוכנה למסך חכם: זמני תפילה ושיעורי תורה, הודעות לקהל, לוח נפטרים ואזכרות — תצוגה מכובדת, ברורה ונוחה לעדכון. אפשרות ייעודית גם לבתי כנסת בלי אינטרנט יציב.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary/80 bg-primary/5 w-fit px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              מתאים לבתי כנסת, בתי מדרש וקהילות
            </div>
            <div className="pt-1 sm:pt-2">
              <HeroGallery />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto text-lg gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white" onClick={() => window.open(whatsAppUrl, '_blank')} aria-label="שליחת הודעה בוואטסאפ">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                שלחו הודעה בוואטסאפ
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg gap-2 border-primary text-primary hover:bg-primary/5" onClick={() => window.open('tel:0523517302')} aria-label="חיוג טלפוני">
                <Phone className="h-5 w-5" aria-hidden="true" />
                התקשרו אלינו
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" onClick={() => window.open('https://drive.google.com/file/d/1FzVnFoTx0hhkK7s_gsj44noDFGubPVjN/view?usp=sharing', '_blank')} aria-label="הורדת קובץ התוכנה">
                <Download className="h-5 w-5" aria-hidden="true" />
                הורדת התוכנה
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" onClick={() => window.open('tel:0523517302')} aria-label="חיוג טלפוני">
                <Phone className="h-5 w-5" aria-hidden="true" />
                התקשרו אלינו
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2" onClick={() => window.open('mailto:Davinet120@gmail.com')} aria-label="שליחת אימייל">
                <Mail className="h-5 w-5" aria-hidden="true" />
                שלחו מייל
              </Button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed [overflow-wrap:anywhere]">
              רכישה: <span className="text-foreground/90">חבילה מלאה</span> (מחשב + מסך + תוכנה) או{" "}
              <span className="text-foreground/90">רישיון תוכנה בלבד</span> — לפי מה שמתאים לבית הכנסת.{" "}
              <a href="#purchase-options" className="text-primary font-medium underline-offset-2 hover:underline whitespace-nowrap">
                פרטים על שני המסלולים
              </a>
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>⚠️ הפעלת המערכת דורשת מפתח רישיון לאחר רכישה</p>
              <p>✅ לקוחות שרכשו רישיון מקבלים ליווי והתקנה מרחוק</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50" aria-labelledby="benefits-heading">
        <div className="container space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 id="benefits-heading" className="text-3xl font-bold text-primary">למה לבחור בלוח דוד?</h2>
            <p className="text-muted-foreground text-lg">
              מערכת חכמה שנבנתה במיוחד לצרכים הייחודיים של גבאים ובתי כנסת, עם דגש על כבוד למקום ונוחות מקסימלית.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: LayoutGrid, title: "מסך אחד לכל המידע", desc: "זמני תפילות, שיעורים, הודעות לקהל ולוח נפטרים/אזכרות — הכל מוצג בצורה ברורה ומכובדת." },
              { icon: BookOpen, title: "מותאם במיוחד לבתי כנסת", desc: "פותח מתוך הבנה עמוקה של צרכי הקהילה והגבאים." },
              { icon: LayoutTemplate, title: "מספר ערכות נושא מרשימות", desc: "עיצובים מכובדים ואלגנטיים לבחירה, המכבדים את קדושת המקום." },
              { icon: Settings, title: "עדכון פשוט ומהיר", desc: "ממשק ניהול ידידותי שמאפשר לעדכן מידע מכל מקום בקלות." },
              { icon: CalendarClock, title: "שגר ושכח · זמני תפילה לטווח ארוך", desc: "ניהול זמני תפילה בהגדרה חד־פעמית לתקופה ארוכה — בלי שינויים תכופים, בלי עומס שוטף על הגבאי וללא צורך לעדכן את הלוח שוב ושוב." },
              { icon: Monitor, title: "תצוגה ברורה ומכובדת", desc: "טקסט קריא וברור, צבעים נעימים לעין וסדר מופתי." },
              { icon: Wrench, title: "התקנה קלה", desc: "תהליך התקנה פשוט ומהיר על כל מסך תומך." },
              { icon: Phone, title: "תמיכה ותחזוקה", desc: "שירות אדיב וזמין לכל שאלה או בעיה טכנית." },
            ].map((benefit, i) => (
              <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4" aria-hidden="true">
                    <benefit.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offline / no-internet — flows with page, no heavy card frame */}
      <section
        className="relative py-20 overflow-hidden border-y border-border/50 bg-gradient-to-b from-muted/40 via-background to-muted/30"
        aria-labelledby="offline-heading"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]" aria-hidden="true" />
        <div className="container relative max-w-6xl">
          <div className="mx-auto max-w-4xl space-y-10 sm:space-y-12 text-right min-w-0">
            <div className="space-y-5 sm:space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-secondary/35 bg-secondary/10 px-4 py-2 text-sm font-bold text-secondary-foreground">
                <Sparkles className="h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                פתרון ייחודי לבתי כנסת ללא גישה לאינטרנט
              </p>
              <h2 id="offline-heading" className="text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold text-primary leading-[1.12] tracking-tight">
                מסך מלא וחכם — גם כשאין רשת בבית הכנסת
              </h2>
              <p className="text-base sm:text-lg text-foreground font-medium leading-relaxed">
                בלי Wi‑Fi, בלי ענן ובלי תלות בספק: התוכנה הייעודית רצה מקומית ומציגה זמנים, הודעות ואזכרות בבהירות.
              </p>
              <div className="flex flex-wrap items-center gap-2 justify-end pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                  <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
                  עצמאי מהרשת · עדכון מקומי
                </span>
                <Badge variant="secondary" className="rounded-full bg-secondary/20 px-3 py-1.5 text-xs font-semibold text-secondary-foreground border border-secondary/30">
                  מוצר משלים · נפרד מהתוכנה הראשית
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-muted-foreground text-center sm:text-right">
                דוגמה לתצוגה במצב עצמאי (ללא אינטרנט)
              </p>
              <SlideshowGallery
                images={offlineGalleryImages}
                ariaLabel="דוגמה לתצוגת תמונות במצב ללא אינטרנט"
                altPrefix="דוגמה לתצוגת תמונות במצב ללא אינטרנט"
                imageFit="contain"
              />
            </div>

            <div className="space-y-5">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                זו אופציה נפרדת מהתוכנה הראשית — לבתי כנסת שבהם אין אינטרנט או שהחיבור לא יציב. כל מה שהקהילה צריכה על המסך, בלי להמתין לרשת.
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { t: "זמני תפילה ושיעורי תורה", d: "לוח זמנים ברור על המסך" },
                  { t: "הודעות לקהל", d: "עדכונים והכרזות" },
                  { t: "לוח נפטרים ואזכרות", d: "שמות ותאריכים בצורה מכובדת" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="group flex gap-3 rounded-2xl border border-primary/15 bg-muted/25 p-4 transition-colors duration-200 hover:border-secondary/35 hover:bg-muted/40"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <span>
                      <span className="font-semibold text-foreground block">{item.t}</span>
                      <span className="text-sm text-muted-foreground">{item.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* System Features Grid */}
      <section className="py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary">כל מה שהקהילה צריכה לדעת</h2>
            <p className="text-muted-foreground text-lg">
              התצוגה הדיגיטלית מרכזת את כל המידע החשוב למתפללים בצורה ברורה, מאירת עיניים ומאורגנת.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "זמני תפילה", desc: "שחרית, מנחה וערבית - מדויקים ומעודכנים." },
              { icon: Bell, title: "הודעות לקהילה", desc: "עדכונים חשובים, החלטות ועד וחדשות הקהילה." },
              { icon: BookOpen, title: "שיעורי תורה", desc: "זמני שיעורים, נושאים ושמות הרבנים המוסרים." },
              { icon: CalendarHeart, title: "אזכרות", desc: "יארצייטים של חברי הקהילה בצורה מכובדת." },
              { icon: CalendarDays, title: "אירועים", desc: "בריתות, בר מצוות, קידושים ואירועי שמחה." },
              { icon: Moon, title: "זמני שבת וחגים", desc: "כניסת ויציאת שבת, זמני חג וזמנים הלכתיים." },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-muted/30 border border-muted hover:border-primary/20 transition-colors">
                <div className="mt-1">
                  <feature.icon className="h-8 w-8 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">השקעה שמשדרגת את חזות בית הכנסת</h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              המעבר ממודעות נייר ולוחות פלסטיק למסך דיגיטלי מתקדם אינו רק עניין אסתטי. זהו שדרוג משמעותי בחוויית המתפלל ובכבוד המקום.
            </p>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              מערכת "לוח דוד" תוכננה מתוך כבוד למסורת והבנת הצרכים המודרניים, כדי לאפשר תקשורת שוטפת, ברורה ומכובדת מול קהל המתפללים.
            </p>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg mt-4" onClick={() => window.open(whatsAppUrl, '_blank')} aria-label="צרו קשר בוואטסאפ">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              צרו קשר בוואטסאפ
            </Button>
          </div>
          <div className="grid gap-4">
            {[
              "מראה נקי, מודרני ומכובד",
              "סוף למודעות נייר קרועות וישנות",
              "חיסכון בהדפסות וזמן גבאי יקר"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-primary-foreground/10 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" aria-hidden="true" />
                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section — גם: id לעוגן מפרטי רכישה בהירו */}
      <section id="pricing" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container max-w-4xl">
          <Card className="border-primary shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-primary to-secondary" />
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-10 space-y-6 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-2">הצעת מחיר מותאמת אישית</Badge>
                <div className="space-y-2">
                  <p className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                    להצעת מחיר — צרו קשר
                  </p>
                  <p className="text-muted-foreground text-lg">
                    נשמח לפרט על עלויות, התאמה לבית הכנסת שלכם ותנאי רישיון — ללא התחייבות בשיחה ראשונה.
                  </p>
                </div>
                <Button size="lg" className="w-full text-lg mt-4" onClick={() => window.open(whatsAppUrl, '_blank')} aria-label="צרו קשר בוואטסאפ להצעת מחיר">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  צרו קשר להצעת מחיר
                </Button>
              </div>
              <div className="p-10 bg-primary/5 space-y-6">
                <h3 className="text-2xl font-bold text-primary">מה כלול בדרך כלל?</h3>
                <ul className="space-y-4">
                  {[
                    "רישיון שימוש מלא בתוכנה",
                    "התקנה מקצועית",
                    "הגדרות והפעלה ראשונית",
                    "גישה לעדכוני גרסאות",
                    "תמיכה טכנית וליווי לגבאי"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <div id="purchase-options" className="mt-12 space-y-6 scroll-mt-24">
            <h3 className="text-center text-xl md:text-2xl font-bold text-primary">איך ניתן לרכוש?</h3>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              בוחרים את המסלול שמתאים לבית הכנסת — חבילה מלאה (מחשב + מסך + תוכנה) או רכישת התוכנה בלבד. בשני המקרים נשמח לתת הצעת מחיר מפורטת.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">חבילה מלאה: מחשב + מסך + תוכנה</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    מחשב מיני, מסך בגדלים שונים לבחירה והתוכנה — פתרון אחד שמגיע מוכן לעבודה, כולל התאמת גודל מסך לחלל ולצרכים שלכם.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                    <AppWindow className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">תוכנה בלבד (רישיון)</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    רכישת רישיון התוכנה בנפרד — מתאים למי שכבר מחזיק במחשב ובמסך מתאימים ורוצה רק את מערכת &quot;לוח דוד&quot; והתקנה.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Strip CTA */}
      <section className="py-12 bg-[#25D366]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="space-y-2 text-white">
            <h2 className="text-2xl font-bold">מעדיפים לדבר איתנו בוואטסאפ?</h2>
            <p className="text-white/90">זמינים לשאלות, ייעוץ והדגמות</p>
          </div>
          <Button size="lg" variant="secondary" className="text-lg gap-2 text-[#25D366] whitespace-nowrap" onClick={() => window.open(whatsAppUrl, '_blank')} aria-label="פנייה בוואטסאפ לשמוע עוד">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            אני רוצה לשמוע עוד
          </Button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-background">
        <div className="container grid sm:grid-cols-3 gap-8">
          {[
            { title: "התקנה פשוטה ומהירה", desc: "צוות ההתקנה שלנו דואג להכל, מהחיבור ועד להפעלה הראשונית." },
            { title: "ממשק נוח לעדכון", desc: "עדכון התוכן נעשה בפשטות דרך ממשק ניהול ידידותי ויציב." },
            { title: "ליווי ותמיכה", desc: "אנחנו זמינים לכל שאלה, תקלה או בקשה של הגבאים לאורך כל הדרך." }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-3 p-6">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="contact" className="py-20 bg-muted/50 scroll-mt-20" aria-labelledby="faq-heading">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            <div className="space-y-4 text-center">
              <h2 id="faq-heading" className="text-3xl font-bold text-primary">שאלות נפוצות</h2>
              <p className="text-muted-foreground">כל מה שצריך לדעת לפני שמזמינים את לוח דוד לבית הכנסת שלכם.</p>
            </div>
            <Accordion type="single" collapsible className="w-full bg-background rounded-xl p-2 border shadow-sm">
              {[
                { q: "מה בדיוק מקבלים?", a: "בהצעה כלולים בדרך כלל רישיון מלא לשימוש בתוכנת 'לוח דוד', מערכת ניהול נוחה, כל אפשרויות התצוגה, התקנה ותמיכה טכנית — הפרטים המדויקים יסוכמו בהצעת המחיר." },
                { q: "האם זה מתאים לכל בית כנסת?", a: "כן! המערכת גמישה לחלוטין וניתן להתאים את ההגדרות, זמני התפילה, העיצוב והתוכן לכל קהילה, נוסח או מנהג." },
                { q: "האם יש התקנה?", a: "כן. ההתקנה המקצועית וההפעלה הראשונית בבית הכנסת נכללות במסגרת ההצעה — יש לוודא מולנו את הפרטים בעת קבלת הצעת המחיר." },
                { q: "האם אפשר לעדכן הודעות בקלות?", a: "בהחלט. המערכת תוכננה במיוחד כדי לאפשר לגבאים לעדכן זמנים, הודעות ואזכרות בקלות ובמהירות, ללא צורך בידע טכני מוקדם." },
                { q: "איך מקבלים הצעת מחיר?", a: "צרו קשר בוואטסאפ או בטלפון — נשמח להבין את הצרכים של בית הכנסת ולהחזיר הצעה מפורטת, כולל רישיון, התקנה והפעלה ראשונית ותמיכה שוטפת." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0 px-4">
                  <AccordionTrigger className="text-right hover:no-underline font-medium text-lg text-foreground hover:text-primary transition-colors py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground/80 py-12 border-t border-primary-foreground/10">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-2xl text-primary-foreground mb-4">
              <Monitor className="h-6 w-6" aria-hidden="true" />
              <span>לוח דוד</span>
            </div>
            <p className="text-sm">פיתוח ועיצוב מערכות מתקדמות לבתי כנסת.</p>
            <p className="text-sm">© כל הזכויות שמורות ללוח דוד מבית DaviNet</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3 text-sm">
            <a href="tel:0523517302" className="flex items-center gap-2 hover:text-white transition-colors" aria-label="חיוג לטלפון 052-3517302">
              <Phone className="h-4 w-4" aria-hidden="true" />
              052-3517302
            </a>
            <a href="mailto:Davinet120@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors" aria-label="שליחת אימייל ל-davinet120@gmail.com">
              <Mail className="h-4 w-4" aria-hidden="true" />
              davinet120@gmail.com
            </a>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors text-[#25D366]" aria-label="פתיחת שיחה בוואטסאפ">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              וואטסאפ
            </a>
          </div>
        </div>
        <div className="container mt-8 pt-6 border-t border-primary-foreground/10 max-w-2xl mx-auto">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-primary-foreground/85" aria-label="קישורים משפטיים">
            <button
              type="button"
              onClick={() => openLegal("privacy")}
              className="rounded-md px-2 py-1.5 hover:text-white hover:bg-primary-foreground/10 transition-colors underline underline-offset-2"
            >
              מדיניות פרטיות
            </button>
            <button
              type="button"
              onClick={() => openLegal("accessibility")}
              className="rounded-md px-2 py-1.5 hover:text-white hover:bg-primary-foreground/10 transition-colors underline underline-offset-2"
            >
              הצהרת נגישות
            </button>
            <button
              type="button"
              onClick={() => openLegal("cookies")}
              className="rounded-md px-2 py-1.5 hover:text-white hover:bg-primary-foreground/10 transition-colors underline underline-offset-2"
            >
              מדיניות עוגיות
            </button>
          </nav>
          <p className="text-center text-xs text-primary-foreground/55 mt-4 max-w-md mx-auto leading-relaxed">
            לחצו לפתיחת המסמך בחלון — התוכן המלא זמין בלי להאריך את הגלילה בעמוד הראשי.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
