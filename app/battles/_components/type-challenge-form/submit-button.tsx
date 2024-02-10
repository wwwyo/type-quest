import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="text-white px-2 w-fit">
      {pending ? "確認中" : "提出する"}
    </Button>
  );
};
