import type { ReactNode } from "react";

export const metadata = {
  title: "Immersive 3D NFT Explorer · Pixel Journey",
  description: "Educational CSS 3D NFT card showcase for WAX collections",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
