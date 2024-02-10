import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Sword } from "lucide-react";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="text-white px-2 w-fit flex gap-x-1"
      disabled={pending}
    >
      <Sword />
      {pending ? "確認中" : "提出する"}
    </Button>
  );
};
