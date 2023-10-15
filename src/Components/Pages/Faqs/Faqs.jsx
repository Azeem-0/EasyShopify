import React from 'react'
import faqs from "./FaqsData";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import "./Faqs.css";
function Faqs() {
  return <div id='faqs-section'>
    <div id='faqs'>
      <div id='faqs-heading'>
        <h1>FAQS</h1>
        <p>We're are here and ready to help!, See some of our customers FAQ's below.</p>
      </div>
      <div id='faqs-items'>
        <Accordion>
          {faqs && faqs.map((ele, ind) => {
            return <AccordionItem key={ind}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {ele.query}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {ele.reply}
              </AccordionItemPanel>
            </AccordionItem>
          })}
        </Accordion>
      </div>
    </div>
  </div >
}

export default Faqs