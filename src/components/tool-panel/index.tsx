import React from 'react'
import { Form, ColorPicker, Segmented } from 'antd'
import './styles.scss'
import { DrawStyle } from '../draw'

interface ToolPanelProps {
  update: (drawStyle: DrawStyle) => void
  initialData: DrawStyle
}
const Item = Form.Item



const colorPresets = [{
  label: '预设',
  // colors: ['#1e1e1e', '#e03131', '#2f9e44', '#1971c2', '#f08c00']
  colors: [
    '#000000',
    '#000000E0',
    '#000000A6',
    '#00000073',
    '#00000040',
    '#00000026',
    '#0000001A',
    '#00000012',
    '#0000000A',
    '#00000005',
    '#F5222D',
    '#FA8C16',
    '#FADB14',
    '#8BBB11',
    '#52C41A',
    '#13A8A8',
    '#1677FF',
    '#2F54EB',
    '#722ED1',
    '#EB2F96',
    '#F5222D4D',
    '#FA8C164D',
    '#FADB144D',
    '#8BBB114D',
    '#52C41A4D',
    '#13A8A84D',
    '#1677FF4D',
    '#2F54EB4D',
    '#722ED14D',
    '#EB2F964D',
  ],
}]

const strokeWidthOptions = [
  {
    label: '细',
    value: 2,
  },
  {
    label: '粗',
    value: 3,
  },
  {

    label: '特粗',
    value: 5,
  },
]

const ToolPanel: React.FC<ToolPanelProps> = ({ update, initialData }) => {

  const onValuesChange = (_, allValues: any) => {
    // console.log(allValues)
    const { color, bgColor } = allValues
    update({
      ...allValues,
      color: typeof color === 'string' ? color : color.toHexString(),
      bgColor: typeof bgColor === 'string' ? bgColor : bgColor.toHexString(),
    })
  }

  return (
    <div className='toolpanel-container'>
      <div className='toolpanel'>
        {/* <div className='toolpanel-item'>
          <span className='toolpanel-item-title'>描边</span>
        </div> */}
        <Form
          layout='vertical'
          initialValues={initialData}
          onValuesChange={onValuesChange}        >
          <Item
            label="描边"
            name="color"
            className='toolpanel-item-title'
          >
            <ColorPicker format="hex" defaultFormat="hex" presets={colorPresets} />
          </Item>
          <Item
            label="背景"
            name="bgColor"
            className='toolpanel-item-title'
          >
            <ColorPicker format="hex" defaultFormat="hex" presets={colorPresets} />
          </Item>
          <Item
            label="描边宽度"
            name="strokeWidth"
            className='toolpanel-item-title'
          >
            <Segmented options={strokeWidthOptions} />
          </Item>



        </Form>
      </div>

    </div>
  )
}


export default (ToolPanel)
