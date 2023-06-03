function useLocaStorage() {
  const setDataLocaStorage = (key, data = {}) => {
    const dataLocaStorage = JSON.stringify(data);
    localStorage.setItem(key, dataLocaStorage);
  };

  const getDataLocaStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  };

  return {
    setDataLocaStorage,
    getDataLocaStorage,
  };
}

export default useLocaStorage;
