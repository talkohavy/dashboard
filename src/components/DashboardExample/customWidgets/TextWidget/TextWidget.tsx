import { Undraggable } from '../../../../../lib/main.ts';
import { SharedWidgetProps } from '../../DashboardExample.tsx';

type TextWidgetProps = SharedWidgetProps & {
  text: string;
};

export default function TextWidget(props: TextWidgetProps) {
  const { widgetId, text } = props;

  return (
    <div className='size-full'>
      <Undraggable>
        <div>widget id: {widgetId}</div>
        <div>{text}</div>
      </Undraggable>
    </div>
  );
}
