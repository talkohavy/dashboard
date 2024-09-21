import { Dashboard, Widget } from '../../../lib/main';
import Title from '../../components/Title';
import { WidgetTypes1, dashboardSettings, widgetsArr } from './constants';
import TextWidget from './customWidgets/TextWidget';

const WIDGET_MAPPER = {
  [WidgetTypes1.Text]: TextWidget,
};

export type SharedWidgetProps = {
  widgetId: string;
};

export default function DashboardExample1() {
  return (
    <div className='size-full flex justify-center flex-col items-center gap-6'>
      <Title title='Dashboard Example 1' />

      <Dashboard settings={dashboardSettings} data={widgetsArr}>
        {widgetsArr.map(({ i: widgetId, type, props }) => (
          <div key={widgetId}>
            <Widget axisHandlerPositions={dashboardSettings.widgets?.axisHandlerPositions} className='bg-neutral-200'>
              {WIDGET_MAPPER[type]?.({ widgetId, ...props })}
            </Widget>
          </div>
        ))}
      </Dashboard>
    </div>
  );
}
