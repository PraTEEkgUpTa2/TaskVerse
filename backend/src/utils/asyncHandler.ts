const asyncHandler = (requestHandler:any) => {
  return (req:any, res:any, next:any) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error:any) => {
      console.error("Error in async handler:", error  );
      next(error);
    })
  };
}

export { asyncHandler }