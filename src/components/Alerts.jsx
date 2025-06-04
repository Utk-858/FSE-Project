const Alerts = ({ temperature }) => {
    if (temperature > 40) {
      return (
        <div className="bg-red-500 text-white p-3 mt-4 rounded">
          ⚠️ Heatwave Alert! Stay hydrated.
        </div>
      );
    }
    return null;
  };
  