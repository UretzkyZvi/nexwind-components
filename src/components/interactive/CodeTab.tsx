interface CodeTabProps {
    componentSource: string;
    width?: number;
  }
  
  const CodeTab: React.FC<CodeTabProps> = ({ componentSource,width  }) => {
    return (
      <div className="h-[60dvh] overflow-auto" style={{width}}>
        <pre>
          <code className="language-jsx">{componentSource}</code>
        </pre>
      </div>
    );
  };

  export default CodeTab;