interface ApiClientOptions {
  method?: "GET" | "POST";
  endpoint: string;
  token: string;
  customer: string;
  referer: string;
}

export async function apiClient({
  method = "GET",
  endpoint,
  token,
  customer,
  referer,
}: ApiClientOptions) {
  const url = `${process.env.MY_FIBANK_BASE_URL}/${endpoint}`;
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "bg",
    Authorization: `Bearer ${token}`,
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    DNT: "1",
    "EBank-App-Version": "1",
    "EBank-Client-Time": new Date().toISOString(),
    "EBank-Cust-Id": customer,
    "EBank-Device-Id": "AABBCCDDEE",
    "EBank-Referer": referer,
    "If-Modified-Since": "Mon, 26 Jul 1997 05:00:00 GMT",
    Pragma: "no-cache",
    Referer: "https://my.fibank.bg/EBank/dashboard",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua":
      '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
  };

  const response = await fetch(url, {
    method,
    headers,
  });

  try {
    return await response.json();
  } catch {
    return { error: "Failed to parse JSON response", status: response.status };
  }
}
