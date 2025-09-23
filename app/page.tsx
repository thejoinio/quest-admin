import { SetupForm } from "./setup-form";

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-dvh fullscreen-container relative gap-4 w-full mx-auto overflow-hidden py-10 md:py-20 px-5 md:px-10 lg:px-20 font-(family-name:--font-tsb)">
      <div className="flex flex-col w-full max-w-[566px] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),linear-gradient(98deg,rgba(102,254,203,0.20)_6.1%,_rgba(137,64,255,0.20)_103.66%)] backdrop-blur-[1.626890778541565px] rounded-[32px] p-5 md:p-10 shadow-2xl">
        <div className="flex flex-col gap-[9px] relative mb-[26px]">
          <h1 className="text-white-primary text-[26px] font-semibold">Log In</h1>
          <p className="text-[13px] font-medium text-white/80">Please enter your details to log in</p>
        </div>
        <SetupForm />
      </div>
    </section>
  );
}
