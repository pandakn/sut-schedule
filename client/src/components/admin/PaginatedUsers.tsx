import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// components
import ReactPaginate from "react-paginate";
import TableManageUsers from "./TableManageUsers";

// icons
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// types
import { Users } from "./@types/user";

type PaginatedUsersProps = {
  data: Users[];
  itemsPerPage: number;
};

const paginationVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const PaginatedUsers = ({ data, itemsPerPage }: PaginatedUsersProps) => {
  const [currentItems, setCurrentItems] = useState<Users[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchQuery(searchFieldString);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage, searchQuery]);

  return (
    <>
      <TableManageUsers
        usersData={currentItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchChange={onSearchChange}
      />

      <AnimatePresence>
        <motion.div
          variants={paginationVariants}
          initial="hidden"
          animate="visible"
        >
          <ReactPaginate
            breakLabel={<span className="mr-4">...</span>}
            nextLabel={
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md">
                <BsChevronRight />
              </span>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={
              <span className="flex items-center justify-center w-10 h-10 mr-4 bg-gray-100 rounded-md">
                <BsChevronLeft />
              </span>
            }
            containerClassName="flex items-center justify-center mt-8 mb-4"
            pageClassName="block hover:bg-gray-100 w-10 h-10 flex items-center justify-center rounded-md mr-4"
            activeClassName="bg-orange-400 text-white"
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PaginatedUsers;
