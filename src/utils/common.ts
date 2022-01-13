import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatDate = (date: string | dayjs.Dayjs, formatString: string): string => dayjs(date).format(formatString);
