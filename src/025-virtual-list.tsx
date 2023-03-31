import React, { useState, useEffect, useRef } from "react";
interface VirtualListProps<T> {
  data: T[];
  itemHeight: number;
  renderItem: (item: T) => React.ReactNode;
  containerHeight: number;
  overscanCount: number;
}

const VirtualList = <T,>({
  data,
  itemHeight,
  renderItem,
  containerHeight,
  overscanCount,
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const start = Math.floor(scrollTop / itemHeight);
  const end = Math.min(start + Math.ceil(containerHeight / itemHeight), data.length);
  const visibleData = data.slice(start, end);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const paddingTop = start * itemHeight;
  const paddingBottom = (data.length - end) * itemHeight;
  const totalHeight = data.length * itemHeight;
  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflowY: "scroll" }}
    >
      <div style={{ height: totalHeight, paddingTop, paddingBottom }}>
        {visibleData.map((item, index) => (
          <div key={index} style={{ height: itemHeight }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};


export const VirtualListDemo = () => {
  const data = Array.from({ length: 10000 }, (_, i) => i);
  const itemHeight = 50;
  const renderItem = (item: any) => <div>{item}</div>;
  const overscanCount = 10;
  const containerHeight = 500;

  return (
    <VirtualList
      data={data}
      itemHeight={itemHeight}
      renderItem={renderItem}
      overscanCount={overscanCount}
      containerHeight={containerHeight}
    />
  );
};

export default VirtualList;

