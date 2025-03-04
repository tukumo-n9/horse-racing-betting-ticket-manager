import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";

export function formatDate(dateString: string): string {
  return format(parse(dateString, "yyyy-MM-dd", new Date()), "y年M月d日(eee)", {
    locale: ja,
  });
}
