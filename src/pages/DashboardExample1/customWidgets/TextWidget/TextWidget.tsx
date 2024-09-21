import { Undraggable } from '../../../../../lib/main';
import { SharedWidgetProps } from '../../DashboardExample1';

type TextWidgetProps = SharedWidgetProps & {
  text: string;
};

export default function TextWidget(props: TextWidgetProps) {
  const { widgetId, text } = props;

  return (
    <div className='size-full bg-neutral-50 dark:bg-[#ddd]'>
      <Undraggable>
        <div>widget id: {widgetId}</div>
        <div>{text}</div>
      </Undraggable>
    </div>
  );
}
