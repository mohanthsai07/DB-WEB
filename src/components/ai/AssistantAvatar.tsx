type AssistantAvatarProps = {
  className?: string;
};

export default function AssistantAvatar({ className = "" }: AssistantAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#123b2a] text-[13px] font-extrabold text-white ${className}`}
    >
      D
      <span className="absolute bottom-0.5 right-0.5 h-1.5 w-1.5 rounded-full border border-white bg-[#f15a27]" />
    </span>
  );
}
