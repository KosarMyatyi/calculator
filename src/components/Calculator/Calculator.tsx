import React, { useState } from 'react'
import cls from './Calculator.module.css'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import weights from '../../data/weights.json';
import { CableData } from '../../types/types';

const Calculator = () => {
  const [group, setGroup] = useState<string>('')
  const [subGroup, setSubGroup] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [sum, setSum] = useState<number | string | null>(null)

  const result = () => {
    const calc = (weights as CableData)[group][subGroup][0].value;
    setSum(((calc) * Number(length)).toFixed(1));
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        <h2 className={cls.title}>Калькулятор массы кабеля:</h2>
        <div className={cls.calculator}>
          <Autocomplete
            value={group}
            onChange={(_, i) => {
              if (i) {
                setGroup(i)
                setSubGroup('')
              }
            }}
            disablePortal
            id="brand_size_group"
            options={Object.keys(weights)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Группа маркаразмера" />}
          />
          <Autocomplete
            value={subGroup}
            onChange={(_, i) => {
              if (i) setSubGroup(i)
            }}
            disablePortal
            id="brand_size_subgroup"
            options={group ? Object.keys((weights as CableData)[group]) : ['']}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Подгруппа маркаразмера" />}
          />
          <TextField
            value={length}
            onChange={(e) => setLength(e.target.value)}
            id="outlined-number"
            label="Длина (км)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            disabled={!group.length || !subGroup.length || !length.length}
            onClick={result}
            variant="contained"
            color="success">
            Рассчитать
          </Button>
        </div>
        <div className={cls.results}>
          <h3>Результат: {sum} {sum && 'кг'}</h3>
        </div>
      </div>
    </div>
  )
}

export default Calculator;