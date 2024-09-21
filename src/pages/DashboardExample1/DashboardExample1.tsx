import clsx from 'clsx';
import { Dashboard, Widget } from '../../../lib/main';
import Title from '../../components/Title';
import { WidgetTypes1, dashboardSettings, widgetsArr } from './constants';
import TextWidget from './customWidgets/TextWidget';
import styles from './DashboardExample1.module.scss';

const WIDGET_MAPPER = {
  [WidgetTypes1.Text]: (props: any) => <TextWidget {...props} />,
};

export type SharedWidgetProps = {
  widgetId: string;
};

export default function DashboardExample1() {
  return (
    <div className='size-full flex justify-center flex-col items-center gap-6'>
      <Title title='Dashboard Example 1' />

      <Dashboard
        settings={dashboardSettings}
        data={widgetsArr}
        className={clsx(styles.myDashboard, 'dark:bg-neutral-800')}
      >
        {widgetsArr.map(({ i: widgetId, type, props }) => (
          <div key={widgetId}>
            <Widget axisHandlerPositions={dashboardSettings.widgets?.axisHandlerPositions}>
              {WIDGET_MAPPER[type]?.({ widgetId, ...props })}
            </Widget>
          </div>
        ))}
      </Dashboard>
    </div>
  );
}
