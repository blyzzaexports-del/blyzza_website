"use client";

interface WelcomePopupProps {
  isOpen: boolean;
  name: string;
}

export function WelcomePopup({
  isOpen,
  name,
}: WelcomePopupProps) {

  if (!isOpen) return null;

  return (

    <div className="fixed top-5 right-5 z-50">

      <div className="bg-green-600 text-white px-6 py-4 rounded shadow-lg animate-bounce">

        <p className="font-semibold text-lg">

          🎉 Welcome {name}!

        </p>

        <p className="text-sm">

          Login Successful

        </p>

      </div>

    </div>

  );

}