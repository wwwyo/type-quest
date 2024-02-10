import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="text-white rounded py-px px-2 font-medium">
      {pending ? "確認中" : "提出する"}
    </Button>
  );
};
