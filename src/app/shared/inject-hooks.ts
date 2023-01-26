import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const useNavigate = () => {
  const router = inject(Router);

  return (url: string) => router.navigate([url]);
};
