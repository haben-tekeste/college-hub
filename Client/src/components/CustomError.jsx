const CustomError = (err) => {
    // console.log(err);
  return (
    <div className="alert alert-danger">
      <h4>Ooops....</h4>
      <ul className="my-0">
        {err.err.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomError;
