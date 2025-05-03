"use client"
import { ThemeProvider } from "../app/components/theme-provider";
import {Provider} from "react-redux";
import {store} from"../store/store";

export default function ClientLayout({children}:{children: React.ReactNode}){
    return(
       <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
             <Provider store={store}>
              {children}
             </Provider>
           
         
          </ThemeProvider>
    )
  }