import React, { FunctionComponent } from "react"

const Box: FunctionComponent = ({ children }) => (
  <div className="root">
    <div className="box">{children}</div>
    <style jsx>{`
      .root {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        background: #eeeeee;
        font-size: 1rem;
      }

      .box {
        background: #f4f1ee;
        padding: 30px;
        max-width: 600px;
        border: 1px solid #e1dedb;
        border-radius: 3px;
        flex: 0 0 auto;
      }
    `}</style>
  </div>
)

export default Box
