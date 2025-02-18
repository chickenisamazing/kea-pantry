"use client";
import { useRouter } from "next/navigation";

// 레시피 상세는 서버 컴포넌트이기에
// 수정 버튼은 클라이언트 컴포넌트로 만듭니다.
export default function ModifyButton({ paramId }) {
  const router = useRouter();
  const goModifyPage = (paramId) => {
    router.push(`/modify/${paramId}`);
  };
  return <div onClick={() => goModifyPage(paramId)}> 수정버튼</div>;
}
