import { FC, useState, useEffect } from 'react'
import { IDropdownOption } from '../src/components/Dropdown'
import InputWSelect from '../src/components/InputWSelect'
import { time } from '../../store'
import { Time } from './components/Time'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ADD_TIME, GET_TIMELIST } from '../../store/constants'
export const App: FC = () => {
  const [selectedItem, setSelectedItem] = useState<IDropdownOption>({
    label: 'Horas',
    labelValue: 'hour'
  })
  const [timelist, setTimelist] = useState<time[]>([])
  const [number, setNumber] = useState<number | undefined>()
  // const list = async () => await window.electron.ipcRenderer.invoke(GET_TIMELIST, 'timelist')
  // const handleReceiveData = (item: any) => {
  //   const timelist = item as { timelist: time[] }
  //   console.log(item)
  //   if (timelist.timelist) {
  //     console.log(item)
  //     setTimelist(timelist.timelist)
  //   }
  // }
  // useEffect(() => {
  //   window.electron.ipcRenderer.on(ADD_TIME, handleReceiveData)
  //   return () => {
  //     window.electron.ipcRenderer.removeAllListeners(ADD_TIME)
  //   }
  // }, [])
  return (
    <div className="w-screen h-screen flex flex-col font-orbitron">
      <Header />
      <div className="bg-slate-50 flex flex-col flex-1 p-6 gap-6">
        <InputWSelect
          name="number"
          placeholder="Digite o tempo desejado"
          label="number"
          type="number"
          defaultValue={number}
          onChange={(e) => setNumber(e.target.value as unknown as number)}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          options={[
            { label: 'Horas', labelValue: 'hour' },
            { label: 'Minutos', labelValue: 'min' },
            { label: 'Segundos', labelValue: 'sec' }
          ]}
        />
        {/* <p className="text-xl text-slate-700">Tempos salvos</p> */}
        {/* <div className=" max-h-36 p-4 border border-slate-700 rounded-lg overflow-auto scrollbar-custom">
          <div className="flex flex-wrap gap-4">
            {timelist.map((item, index) => (
              <Time key={index} type={item.type} value={item.number} />
            ))}
          </div>
        </div> */}
      </div>
      <Footer selectedItem={selectedItem} number={number} />
    </div>
  )
}
