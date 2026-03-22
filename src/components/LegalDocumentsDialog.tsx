import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type LegalDocumentId = "privacy" | "accessibility" | "cookies";

type Props = {
  active: LegalDocumentId | null;
  onOpenChange: (open: boolean) => void;
};

const titles: Record<LegalDocumentId, string> = {
  privacy: "מדיניות פרטיות",
  accessibility: "הצהרת נגישות",
  cookies: "מדיניות עוגיות ואחסון מקומי",
};

const subtitles: Record<LegalDocumentId, string> = {
  privacy: "עודכן: מרץ 2026",
  accessibility: "עודכן: מרץ 2026",
  cookies: "עודכן: מרץ 2026",
};

export function LegalDocumentsDialog({ active, onOpenChange }: Props) {
  const open = active !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="flex max-h-[min(90vh,880px)] w-[calc(100vw-1.5rem)] max-w-2xl flex-col gap-0 overflow-hidden p-0 sm:w-full"
      >
        {active && (
          <>
            <DialogHeader className="shrink-0 space-y-2 border-b bg-muted/30 px-5 py-4 text-right sm:px-6 sm:text-right">
              <DialogTitle className="text-xl font-bold leading-snug">{titles[active]}</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">{subtitles[active]}</DialogDescription>
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-right text-sm leading-relaxed text-foreground sm:px-6">
              {active === "accessibility" && <AccessibilityBody />}
              {active === "privacy" && <PrivacyBody />}
              {active === "cookies" && <CookiesBody />}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AccessibilityBody() {
  return (
    <div className="space-y-3">
      <p>
        <strong>שם האתר והשירות:</strong> אתר &quot;לוח דוד&quot; (להלן: &quot;האתר&quot;) מופעל על ידי DaviNet / לוח דוד (להלן: &quot;המפעיל&quot;), לצורך הצגת מידע על מערכת תצוגה דיגיטלית לבתי כנסת ויצירת קשר.
      </p>
      <p>
        <strong>מחויבות לנגישות:</strong> אנו פועלים להנגשת האתר בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998, ולתקן הישראלי ת&quot;י 5568 &quot;קווים מנחים לנגישות תכנים באינטרנט&quot; ברמת AA, המבוסס על הנחיות <span lang="en">WCAG 2.1</span>.
      </p>
      <p>
        <strong>אמצעי נגישות באתר:</strong> מבנה כותרות היררכי, תיאורי <span lang="en">alt</span> לתמונות מהותיות, ניגודיות צבעים בסיסית, אפשרות ניווט במקלדת (כולל מסגרת פוקוס גלויה), קישור &quot;דלג לתוכן העיקרי&quot;, וכפתור צף להתאמות נגישות (ניגודיות גבוהה, הגדלת טקסט, הפחתת תנועה, הדגשת קישורים).
      </p>
      <p>
        <strong>מגבלות ידועות:</strong> ייתכן שחלקים באתר (למשל תוכן מוטמע מצד שלישי) אינם בשליטתנו המלאה. אם מצאתם מכשול נגישות, נשמח לשמוע.
      </p>
      <p>
        <strong>רכז/ת נגישות ופניות:</strong> לבירורים, בקשות והתאמות בנושא נגישות ניתן לפנות בדוא&quot;ל{" "}
        <a href="mailto:Davinet120@gmail.com" className="font-medium text-primary underline underline-offset-2">
          davinet120@gmail.com
        </a>
        , בטלפון{" "}
        <a href="tel:0523517302" className="font-medium text-primary underline underline-offset-2">
          052-3517302
        </a>
        , או בוואטסאפ דרך הקישור באתר. נענה בהקדם האפשרי ובהתאם לדין.
      </p>
      <p className="text-xs text-muted-foreground">הערה: עיצוב האתר עשוי להתעדכן; הצהרה זו תעודכן בעת שינוי מהותי בהנגשה.</p>
    </div>
  );
}

function PrivacyBody() {
  return (
    <div className="space-y-3">
      <p>
        <strong>כללי:</strong> המפעיל מכבד את פרטיות המשתמשים. מדיניות זו מפרטת כיצד נאסף, נשמר ומעובד מידע בהתאם לחוק הגנת הפרטיות, התשמ&quot;א-1981, ולתיקוניו, ולתקנותיו (ככל שהן חלות).
      </p>
      <p>
        <strong>סוגי מידע:</strong> בעת גלישה באתר עשויים להישמר נתונים טכניים אוטומטיים (כגון כתובת <span lang="en">IP</span>, סוג דפדפן ותאריך גישה) בלוגים של שרת האחסון — לצורכי אבטחה ותפעול. בעת יצירת קשר (טלפון, דוא&quot;ל, וואטסאפ) יימסר המידע שתבחרו למסור (שם, טלפון, תוכן הפנייה).
      </p>
      <p>
        <strong>מטרות עיבוד:</strong> מתן מענה לפניות, שיווק ומתן שירות בקשר למוצר &quot;לוח דוד&quot;, שיפור האתר, עמידה בדרישות דין ומניעת הונאות.
      </p>
      <p>
        <strong>בסיס משפטי:</strong> הסכמה כאשר נדרשת, עניין לגיטימי של המפעיל במתן שירות ובתפעול האתר, ולעיתים חובה חוקית.
      </p>
      <p>
        <strong>שמירת מידע ואבטחה:</strong> ננקטים אמצעים סבירים להגנה על מידע מפני גישה בלתי מורשית, אובדן או שימוש לרעה. אין התחייבות לאבטחה מוחלטת בשום מערכת.
      </p>
      <p>
        <strong>מסירה לצדדים שלישיים:</strong> לא נמכור את המידע האישי. העברה לצדדים שלישיים (למשל ספקי אחסון, דוא&quot;ל, אנליטיקה) תיעשה רק ככל הנדרש לתפעול האתר והשירות ובכפוף להתחייבויות סודיות והתאמות חוזיות, אלא אם נדרש לפי דין או צו שיפוטי.
      </p>
      <p>
        <strong>זכויות נושאי מידע:</strong> עיון במידע הנוגע אליכם, תיקון מידע לא מדויק, מחיקה או הגבלת עיבוד — בהתאם לדין. לפנייה בנושא:{" "}
        <a href="mailto:Davinet120@gmail.com" className="font-medium text-primary underline underline-offset-2">
          davinet120@gmail.com
        </a>
        .
      </p>
      <p>
        <strong>קטינים:</strong> האתר אינו מיועד לאיסוף מכוון של מידע על קטינים ללא הסכמת הורה כנדרש בדין.
      </p>
      <p className="text-xs text-muted-foreground">
        שמירה על עדכניות: מדיניות זו עשויה להתעדכן; המשך שימוש באתר לאחר עדכון מהווה הסכמה לגרסה המעודכנת, ככל שהדין מתיר.
      </p>
    </div>
  );
}

function CookiesBody() {
  return (
    <div className="space-y-3">
      <p>
        <strong>מהן עוגיות:</strong> קבצי טקסט קטנים שנשמרים בדפדפן, וכן נתונים באחסון מקומי (<span lang="en">localStorage</span>), המאפשרים לזכור העדפות או פעולות.
      </p>
      <p>
        <strong>שימוש באתר זה:</strong>
      </p>
      <ul className="list-disc list-inside space-y-1 marker:text-muted-foreground">
        <li>
          <strong>הכרחי לתפעול:</strong> שמירת בחירתכם לגבי באנר העוגיות (אישור או דחייה של עוגיות לא חיוניות).
        </li>
        <li>
          <strong>העדפות נגישות:</strong> שמירת הגדרות מתפריט הנגישות (ניגודיות, גודל טקסט, הפחתת תנועה, הדגשת קישורים).
        </li>
      </ul>
      <p>
        <strong>עוגיות צד שלישי:</strong> קישורים לאתרים חיצוניים (למשל גוגל דרייב להורדה, וואטסאפ) כפופים למדיניות של אותם ספקים.
      </p>
      <p>
        <strong>שליטה:</strong> ניתן למחוק עוגיות ונתוני אתר דרך הגדרות הדפדפן. שימו לב שחסימת עוגיות הכרחיות עלולה לפגוע בתפקוד האתר.
      </p>
      <p>
        <strong>באנר הסכמה:</strong> באישור או דחייה נרשמת הבחירה במכשירכם. ניתן לעיין שוב במדיניות זו בכל עת דרך הקישור בכותרת התחתונה.
      </p>
    </div>
  );
}
