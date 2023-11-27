import Button from '../Button'
import { time } from 'src/store'
import { IDropdownOption } from '../Dropdown'

export const Footer = ({
  selectedItem,
  number
}: {
  selectedItem: IDropdownOption
  number?: number
}) => {
  const addTime = (item: Omit<time, 'id'>) => window.electron.ipcRenderer.send('add-time', item)
  const program = async () =>
    await window.electron.ipcRenderer.send('program-shutdown', {
      number,
      type: selectedItem.labelValue
    })
  const unProgram = async () => await window.electron.ipcRenderer.send('unprogram-shutdown')
  return (
    <div className="flex py-6 px-6 w-full justify-end gap-2 items-center select-none bg-slate-50">
      <Button title="unprogram" variant="danger" onClick={unProgram}>
        Desprogramar
      </Button>
      <Button
        title="save"
        variant="secondary"
        onClick={() => {
          if (number) {
            addTime({
              type: selectedItem.labelValue as 'hour' | 'min' | 'sec',
              number: Number(number)
            })
          }
        }}
      >
        Salvar
      </Button>
      <Button
        title="program"
        variant="primary"
        onClick={() => {
          if (number) {
            program()
          }
        }}
      >
        Programar
      </Button>
    </div>
  )
}
