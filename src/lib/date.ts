import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

type Template = "M/D" | "YYYY-MM-DD";

export function formatDate(date: dayjs.ConfigType, template: Template): string {
	return dayjs(date).tz().format(template);
}
