"use client";

import { Suspense } from "react";
import { SearchPage } from "./_components/search-page";

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
