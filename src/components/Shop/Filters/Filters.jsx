import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import { SvgIcon, Select } from '@ui';
import { UiStoreContext } from '@store';

import st from './Filters.module.scss';

const Filters = observer(({ tab, className }) => {
  const [category, setCategory] = useState(null);
  const [sortBy, setSortBy] = useState({
    value: 1,
    label: 'Названию А-Я',
  });
  const uiContext = useContext(UiStoreContext);

  const categoryOptions = [
    { value: 1, label: 'Категория 1' },
    { value: 2, label: 'Категория 2' },
    { value: 3, label: 'Категория 3' },
  ];
  const sortOptions = [
    {
      value: 1,
      label: 'Названию А-Я',
    },
    {
      value: 2,
      label: 'Названию Я-А',
    },
  ];
  return (
    <section className={cns(st.container, className)}>
      <div className="container">
        <div className={st.filters}>
          <div className={st.filtersCol}>
            <Select
              placeholder="Категория"
              value={category}
              options={categoryOptions}
              onChange={setCategory}
            />
          </div>
          <div className={st.filtersCol}>
            <Select
              variant="stacked"
              label="Сортировка по"
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Filters;
