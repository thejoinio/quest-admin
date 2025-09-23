// components/ShareModal.jsx

import { Facebook, Globe, Phone } from "lucide-react";
import Modal from "./modal";
import { X } from "./task-svgs";
import { toast } from "sonner";

const ShareModal = ({
  isOpen,
  onClose,
  referralLink,
}: {
  isOpen: boolean;
  onClose: () => void;
  referralLink?: string;
}) => {
  if (!referralLink) {
    toast.info("No referral link available");
    return;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl p-4">Share your Joinda Quest Referral Link</h3>
      <div className="flex flex-col gap-4 p-4">
        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <a
            href={`whatsapp://send?text=Join me on Join Quest! ${referralLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-green-500 text-white"
          >
            <Phone size={24} />
            <span>WhatsApp</span>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              referralLink
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-600 text-white"
          >
            <Facebook size={24} />
            <span>Facebook</span>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=Join me on Join Quest using my referral link!&url=${encodeURIComponent(
              referralLink
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-white bg-black text-white"
          >
            <X />
            <span>Twitter/X</span>
          </a>
          <a
            href={referralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-white text-white"
          >
            <Globe size={24} />
            <span>Internet</span>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
