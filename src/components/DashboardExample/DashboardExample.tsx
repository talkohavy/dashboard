import { FC } from 'react';
import { Dashboard, Undraggable, Widget } from '../../../dist/main';
import { dashboardSettings, data } from '../constants';

const WIDGET_MAPPER: Record<string, FC> = {
  text: () => (
    <div className='size-full'>
      <Undraggable>hello</Undraggable>
    </div>
  ),
};

export default function DashboardExample() {
  return (
    <Dashboard settings={dashboardSettings} data={data}>
      {data.map(({ i: widgetId, type, props }) => (
        <div key={widgetId}>
          <Widget axisHandlerPositions={dashboardSettings.widgets?.axisHandlerPositions} className='bg-neutral-200'>
            {WIDGET_MAPPER[type]?.({ ...props })}
          </Widget>
        </div>
      ))}
    </Dashboard>
  );
}
