import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

interface TelegramLoginButtonProps {
  botUsername: string;
  authUrl: string;
}

export type TelegramLoginHandle = {
  triggerLogin: () => void;
};

const TelegramLoginButton = forwardRef<TelegramLoginHandle, TelegramLoginButtonProps>(
  ({ botUsername, authUrl }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // avoid duplicate script
    if (document.getElementById("telegram-login-script")) {
      return;
    }
    const container = containerRef.current;

    const script = document.createElement("script");
    script.id = "telegram-login-script";
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", authUrl);
    script.setAttribute("data-request-access", "write");

    container?.appendChild(script);

    return () => {
      // remove script and any child nodes (widget) when unmounting
      if (container) {
        container.innerHTML = "";
      }
      const existing = document.getElementById("telegram-login-script");
      existing?.parentElement?.removeChild(existing);
    };
  }, [botUsername, authUrl]);

  // expose a trigger method to parent via ref
  useImperativeHandle(ref, () => ({
    triggerLogin: () => {
      const el = containerRef.current;
      if (!el) return;
      // widget usually inserts a button/anchor or iframe — try to find and click it
      const clickable =
        el.querySelector<HTMLButtonElement | HTMLAnchorElement>("button, a") ??
        (el.querySelector<HTMLIFrameElement>("iframe") as unknown as
          | HTMLButtonElement
          | HTMLAnchorElement
          | null);
      if (clickable) {
        try {
          (clickable as HTMLElement).click();
          return;
        } catch {
          // fall through to open fallback
        }
      }
      // fallback: open auth URL in a popup (uses the widget redirect endpoint)
      // Note: opening the auth URL directly will redirect user to Telegram auth flow.
      const popup = window.open(
        `https://oauth.telegram.org/auth?bot_id=${encodeURIComponent(
          botUsername
        )}&embed=1`,
        "tg_login",
        "width=600,height=700"
      );
      if (popup) popup.focus();
    },
  }));
  return <div ref={containerRef} />;
});

TelegramLoginButton.displayName = "TelegramLoginButton";

export default TelegramLoginButton;
