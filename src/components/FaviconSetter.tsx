import { useEffect } from "react";

export default function FaviconSetter({ src }: { src: string }) {
  useEffect(() => {
    const img = new Image();
    // Use the same origin for local images
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Make it a square for the favicon
      const size = Math.min(img.width, img.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw a circular clipping path
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Draw the image centered
      const xOffset = (img.width - size) / 2;
      const yOffset = (img.height - size) / 2;
      ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);

      // Update the favicon link element
      const link = document.getElementById("favicon") as HTMLLinkElement;
      if (link) {
        link.href = canvas.toDataURL("image/png");
        link.type = "image/png";
      }
    };
  }, [src]);

  return null;
}
