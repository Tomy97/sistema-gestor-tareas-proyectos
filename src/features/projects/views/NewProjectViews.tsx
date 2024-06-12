import { useState } from 'react';

import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'

import { MultiSelect } from 'primereact/multiselect';

import developersMock from '../../../mock/developers.json'
import { Developer } from '../../../types/developers';
import { Button } from 'primereact/button';

interface DeveloperGroup {
  label: string;
  items: Developer[];
}

export const NewProjectViews = () => {
  const [selectedDevelopers, setSelectedDevelopers] = useState<Developer[] | null>(null);
  const [value, setValue] = useState<string>('')
  const { developers } = developersMock

  const groupedDevelopers: DeveloperGroup[] = developers.map((developer: Developer) => {
    return {
      label: developer.rol,
      items: developers.filter((d: Developer) => d.rol === developer.rol).map((d: Developer) => ({ ...d, label: d.name, value: d }))
    }
  }).filter((developer: DeveloperGroup, index: number, self: DeveloperGroup[]) => self.findIndex((t: DeveloperGroup) => t.label === developer.label) === index);

  const groupedItemTemplate = (option: DeveloperGroup) => {
    return (
      <div className="flex align-items-center">
        <div>{option.label}</div>
      </div>
    );
  };

  return (
    <div className='w-full h-screen flex justify-content-center align-items-center'>
      <div className='w-6'>
        <Card title="Nuevo Proyecto">
          <div className='grid'>
            <div className='col'>
              <div className="flex flex-column gap-2">
                <label htmlFor="newProject">Nombre del proyecto</label>
                <InputText id="newProject" aria-describedby="newProject-help" value={value} onChange={e => setValue(e.target.value)} />
                <small id="newProject-help">
                  Enter your username to reset your password.
                </small>
              </div>
            </div>
            <div className='col flex align-items-center justify-content-center'>
              <div>
                <MultiSelect value={selectedDevelopers} options={groupedDevelopers} onChange={(e) => setSelectedDevelopers(e.value)} optionLabel="label"
                  optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate}
                  placeholder="Seleccionar developers" display="chip" className="w-full md:w-20rem" />
              </div>
            </div>
          </div>
          <div className="grid justify-content-between">
            <div className="col">
              <Button label="Guardar" />
            </div>
            <div className="col">
              <Button severity='danger' label="Cancelar" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
