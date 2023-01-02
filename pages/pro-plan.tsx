import BasicLayout from "../layouts/BasicLayout";

const TYPES = [{
    label:  '',

}]
export default function ProPlan() {
    return (
        <BasicLayout nav={false}>
            <form className="w-full max-w-screen-md mx-auto">
                <fieldset className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-300">
                        <legend className="text-2xl text-neutral mr-4">选择赞助类型</legend>
                    </div>

                    <div className="grid sm:grid-cols-4 gap-6">
                        <label htmlFor="plan-hobby"
                               className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                                        <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">Hobby</span>
                                        <span className="font-bold text-gray-900">
                                            <span className="text-4xl">1</span>
                                            <span className="text-2xl uppercase">GB</span>
                                          </span>
                                                <span>
                                <span className="text-xl font-bold text-gray-500">$</span>
                                <span className="text-xl font-bold text-gray-900 -ml-1">5</span>
                                <span className="text-xl font-semibold text-gray-500">/</span>
                                <span className="text-lg font-semibold text-gray-500">mo</span>
                              </span>
                                                <input type="radio" name="plan" id="plan-hobby" value="hobby"
                                                       className="absolute h-0 w-0 appearance-none"/>
                                                <span aria-hidden="true"
                                                      className="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
                                <span
                                    className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                       className="h-5 w-5 text-green-600">
                                    <path fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"/>
                                  </svg>
                                </span>
                              </span>
                        </label>



                        <label htmlFor="plan-growth"
                               className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                            <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">Growth</span>
                            <span className="font-bold text-gray-900">
            <span className="text-4xl">5</span>
            <span className="text-2xl uppercase">GB</span>
          </span>
                            <span>
            <span className="text-xl font-bold text-gray-500">$</span>
            <span className="text-xl font-bold text-gray-900 -ml-1">10</span>
            <span className="text-xl font-semibold text-gray-500">/</span>
            <span className="text-lg font-semibold text-gray-500">mo</span>
          </span>
                            <input type="radio" name="plan" id="plan-growth" value="growth"
                                   className="absolute h-0 w-0 appearance-none" checked/>
                            <span aria-hidden="true"
                                  className=" absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
            <span
                className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                   className="h-5 w-5 text-green-600">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"/>
              </svg>
            </span>
          </span>
                        </label>
                        <label htmlFor="plan-business"
                               className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                            <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">Business</span>
                            <span className="font-bold text-gray-900">
            <span className="text-4xl">10</span>
            <span className="text-2xl uppercase">GB</span>
          </span>
                            <span>
            <span className="text-xl font-bold text-gray-500">$</span>
            <span className="text-xl font-bold text-gray-900 -ml-1">15</span>
            <span className="text-xl font-semibold text-gray-500">/</span>
            <span className="text-lg font-semibold text-gray-500">mo</span>
          </span>
                            <input type="radio" name="plan" id="plan-business" value="business"
                                   className="absolute h-0 w-0 appearance-none"/>
                            <span aria-hidden="true"
                                  className="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
            <span
                className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                   className="h-5 w-5 text-green-600">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"/>
              </svg>
            </span>
          </span>
                        </label>
                        <label htmlFor="plan-enterprise"
                               className="relative flex flex-col bg-white p-5 rounded-lg shadow-md cursor-pointer">
                            <span className="font-semibold text-gray-500 leading-tight uppercase mb-3">Enterprise</span>
                            <span className="font-bold text-gray-900">
            <span className="text-4xl">20</span>
            <span className="text-2xl uppercase">GB</span>
          </span>
                            <span>
            <span className="text-xl font-bold text-gray-500">$</span>
            <span className="text-xl font-bold text-gray-900 -ml-1">20</span>
            <span className="text-xl font-semibold text-gray-500">/</span>
            <span className="text-lg font-semibold text-gray-500">mo</span>
          </span>
                            <input type="radio" name="plan" id="plan-enterprise" value="enterprise"
                                   className="absolute h-0 w-0 appearance-none"/>
                            <span aria-hidden="true"
                                  className="hidden absolute inset-0 border-2 border-green-500 bg-green-200 bg-opacity-10 rounded-lg">
            <span
                className="absolute top-4 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                   className="h-5 w-5 text-green-600">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"/>
              </svg>
            </span>
          </span>
                        </label>
                    </div>
                </fieldset>
            </form>
        </BasicLayout>
    )
}
