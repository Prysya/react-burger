import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="App">
      <AppHeader />

      <main>
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
