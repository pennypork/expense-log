import dayjs from "dayjs";

type Template = "M/D";

export function formatDate(date: dayjs.ConfigType, template: Template): string {
	return dayjs(date).format(template);
}
