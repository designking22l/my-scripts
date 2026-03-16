    <script>
    // ১. মাউসের রাইট ক্লিক বন্ধ করা এবং টু-স্টেপ ওয়ার্নিং
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        handleViolation();
    });

    // ২. কিবোর্ড শর্টকাট লক এবং ওয়ার্নিং
    document.onkeydown = function(e) {
        if (e.keyCode == 123 || 
           (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || 
           (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
            handleViolation();
            return false;
        }
    };

    // ৩. ভায়োলেশন হ্যান্ডেল করার ফাংশন
    function handleViolation() {
        let attempts = sessionStorage.getItem("violation_count") || 0;
        attempts++;
        sessionStorage.setItem("violation_count", attempts);

        if (attempts == 1) {
            alert("⚠️ সতর্কবার্তা!\n\nআপনি সোর্স কোড দেখার অবৈধ চেষ্টা করেছেন। এই সাইটের সিকিউরিটি পলিসি অনুযায়ী এটি নিষিদ্ধ। এর জন্য আপনাকে ব্লক করা হলো");
        } else {
            blockSite();
        }
    }

    // ৪. সাইট ব্লক করার ফাংশন
    function blockSite() {
        document.body.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100vh; font-family:Arial, sans-serif; text-align:center; background:#ff0000; color:#fff; padding:20px; position:fixed; top:0; left:0; width:100%; z-index:999999;">
                <div>
                    <h1 style="font-size:50px;">🚫 আপনাকে ব্লক করা হয়েছে! 🚫</h1>
                    <p style="font-size:22px; margin: 20px 0;">আপনি অবৈধভাবে সোর্স কোড দেখার চেষ্টা করেছেন। সিকিউরিটি প্রোটোকল অনুযায়ী আপনার অ্যাক্সেস বন্ধ করা হয়েছে।</p>
                    <p>এটি আনব্লক করতে চাইলে নিচের বাটনে ক্লিক করুন।</p>
                    <button onclick="clearAndReload()" style="padding:15px 30px; font-size:18px; cursor:pointer; background:#fff; color:#ff0000; border:none; border-radius:10px; font-weight:bold; margin-top:20px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">আনব্লক এবং রিফ্রেশ করুন</button>
                </div>
            </div>`;
    }

    // আনব্লক করার ফাংশন
    function clearAndReload() {
        sessionStorage.removeItem("violation_count");
        location.reload();
    }

    // ৫. অটোমেটিক ডেভেলপার টুলস ডিটেকশন (ব্যাকগ্রাউন্ড চেক)
    setInterval(function() {
        const threshold = 160;
        const isDevToolsOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
        
        if (isDevToolsOpen) {
            let attempts = sessionStorage.getItem("violation_count") || 0;
            if (attempts >= 1) {
                blockSite();
            }
        }
    }, 2000);
    </script>
